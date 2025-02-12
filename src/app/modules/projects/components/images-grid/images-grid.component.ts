import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.scss']
})
export class ImagesGridComponent implements OnInit {

  @Input() images: string[] = [];
  rows: { images: string[]; config: number[] }[] = [];

  ngOnInit(): void {
    this.createRandomRows();
  }

  /**
   * Generates random row configurations and distributes images accordingly.
   */
  createRandomRows(): void {
    const remainingImages = [...this.images];
    while (remainingImages.length > 0) {
      const rowConfig = this.generateRandomConfig();
      const rowImages = remainingImages.splice(0, rowConfig.length);
      this.rows.push({ images: rowImages, config: rowConfig });
    }
  }

  /**
   * Generates a random Bootstrap grid configuration for a row.
   * Ensures the column sizes sum to 12.
   */
  generateRandomConfig(): number[] {
    const config: number[] = [];
    let remaining = 12;
    let columns = Math.min(2, Math.floor(Math.random() * 2) + 1); // Randomly choose 1, 2, or 3 columns

    while (columns > 0 && remaining > 0) {
      const maxColSize = remaining - (columns - 1) * 5; // Ensure enough space remains for minimum column sizes
      const colSize = columns === 1 ? remaining : Math.max(5, Math.min(maxColSize, this.getRandomColSize()));
      config.push(colSize);
      remaining -= colSize;
      columns--;
    }


    return config;
  }

  getRandomColSize(): number {
    return Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
  }

}
