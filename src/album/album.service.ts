import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import * as _ from 'lodash';
import * as chrome from 'chrome-aws-lambda';
import { launch } from 'puppeteer';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { IAlbum } from './interfaces/album.interface';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { IImage } from './interfaces/image.interface';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel('Album') private readonly albumModel: Model<IAlbum>,
    @InjectModel('Image') private readonly ImageModel: Model<IImage>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async getAlbumList(): Promise<IAlbum[]> {
    return this.albumModel.find();
  }

  async getUserAlbumList(username: string): Promise<IAlbum[]> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      return this.albumModel.find({ uId: user._id });
    }
    return [];
  }

  async createAlbum(createAlbum: CreateAlbumDTO): Promise<IAlbum> {
    const user = await this.userService.findByUsername(createAlbum.username);

    let album: IAlbum;

    if (user) {
      album = new this.albumModel({
        uId: user._id,
        name: createAlbum.name,
      });
    } else {
      album = new this.albumModel({
        name: createAlbum.name,
      });
    }

    const result = await album.save();

    const images = await this.getAlbumLinkImages(createAlbum.link);
    await this.saveImages(images, createAlbum.name);

    return result;
  }

  private async saveImages(images: string[], albumName: string) {
    const { _id } = await this.albumModel.findOne({ name: albumName });
    for await (const image of images) {
      new this.ImageModel({ aId: _id, image }).save();
    }
  }

  private async getAlbumLinkImages(link: string): Promise<string[]> {
    let links: Array<string>;
    if (_.includes(link, 'instagram')) {
      links = await this.getImagesInstagram(link);
    } else {
      links = await this.getImagesNotInstagram(link);
    }
    links = await this.vldBySizeNExt(links);
    return links;
  }

  private async vldBySizeNExt(links: Array<string>) {
    let result: Array<string> = [];
    for (const url of links) {
      const { headers } = await axios({ method: 'GET', url });
      if (
        headers['content-length'] >= 200 * 200 &&
        (headers['content-type'] === 'image/jpeg' ||
          headers['content-type'] === 'image/png')
      ) {
        result.push(url);
      }
    }
    return result;
  }

  private async getImagesInstagram(url: string): Promise<string[]> {
    const browser = await launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    const page = await browser.newPage();

    await page.goto('https://instagram.com/accounts/login/');
    await page.waitForSelector('[name=username]', {
      visible: true,
    });

    await page.type(
      '[name=username]',
      this.configService.get<string>('INSTA_USERNAME'),
    );
    await page.type(
      '[name=password]',
      this.configService.get<string>('INSTA_PASSWORD'),
    );

    await page.click('[type=submit]');

    await page.goto(url);
    await page.waitForSelector('img', {
      visible: true,
    });

    const imagesArray = await page.evaluate(() => {
      const images = document.querySelectorAll('img');

      const urls = Array.from(images).map(v => v.src);

      return urls;
    });

    await browser.close();

    return imagesArray;
  }

  private async getImagesNotInstagram(url: string): Promise<string[]> {
    const browser = await launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector('img', {
      visible: true,
    });

    const data = await page.evaluate(() => {
      const images = document.querySelectorAll('img');

      const urls = Array.from(images).map(v => v.src);

      return urls;
    });

    await browser.close();

    return data;
  }
}
