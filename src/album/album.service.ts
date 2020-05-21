import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash';
import * as chrome from 'chrome-aws-lambda';
import { launch } from 'puppeteer';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { IAlbum } from './interfaces/album.interface';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel('Album') private readonly albumModel: Model<IAlbum>,
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
    const images = await this.getAlbumImages(createAlbum.link);
    const user = await this.userService.findByUsername(createAlbum.username);

    let album: IAlbum;

    if (user) {
      album = new this.albumModel({
        uId: user._id,
        images,
        name: createAlbum.name,
      });
    } else {
      album = new this.albumModel({
        images,
        name: createAlbum.name,
      });
    }

    return album.save();
  }

  private async getAlbumImages(link: string): Promise<string[]> {
    // add validation by size
    if (_.includes(link, 'instagram')) {
      return this.getImagesInstagram(link);
    } else {
      return this.getImagesNotInstagram(link);
    }
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
