import { ImageService } from './../services/image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-contrast',
  templateUrl: './auto-contrast.component.html',
  styleUrls: ['./auto-contrast.component.css']
})
export class AutoContrastComponent implements OnInit {

  constructor(private imageService: ImageService) { }

  private minRed = 255;
  private maxRed = 0;

  private minGreen = 255;
  private maxGreen = 0;

  private minBlue = 255;
  private maxBlue = 0;

  private checkArrays = () => {

    for (var i = 0; i < this.imageService.numPixels; i++) {
      if (this.imageService.pixels[i * 4] < this.minRed) {
        this.minRed = this.imageService.pixels[i * 4];
      } else if (this.imageService.pixels[i * 4 + 1] < this.minGreen) {
        this.minGreen = this.imageService.pixels[i * 4 + 1];
      } else if (this.imageService.pixels[i * 4 + 2] < this.minBlue) {
        this.minBlue = this.imageService.pixels[i * 4 + 2];
      }
    };

    for (var i = 0; i < this.imageService.numPixels; i++) {
      if (this.imageService.pixels[i * 4] > this.maxRed) {
        this.maxRed = this.imageService.pixels[i * 4];
      } else if (this.imageService.pixels[i * 4 + 1] > this.maxGreen) {
        this.maxGreen = this.imageService.pixels[i * 4 + 1];
      } else if (this.imageService.pixels[i * 4 + 2] > this.maxBlue) {
        this.maxBlue = this.imageService.pixels[i * 4 + 2];
      }
    };
  };


  private autoContrast = () => {

    this.checkArrays();


    for (let i = 0; i < this.imageService.numPixels; i++) {
      this.imageService.pixels[i * 4] = (this.imageService.pixels[i * 4] - this.minRed) /
        (this.maxRed - this.minRed) * 255;

      this.imageService.pixels[i * 4 + 1] = (this.imageService.pixels[i * 4 + 1] - this.minGreen) /
        (this.maxGreen - this.minGreen) * 255;

      this.imageService.pixels[i * 4 + 2] = (this.imageService.pixels[i * 4 + 2] - this.minBlue) /
        (this.maxBlue - this.minBlue) * 255;
    };

    this.imageService.context.clearRect(0, 0, this.imageService.canvas.width, this.imageService.canvas.height);
    this.imageService.context.putImageData(this.imageService.imageData, 0, 0);
  };

  ngOnInit() {
  }


}
