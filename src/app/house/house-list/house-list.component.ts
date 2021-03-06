import { Component, OnInit, Input } from '@angular/core';
import { House, DefaultHouse } from '../house-interface/default-house';
import { HouseServiceService } from '../house-service.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  houses: Array<House>;
  // Array of Houses, which will be displayed
  defaultHouse: House;
  // for initializing default values (null and empty strings)
  constructor(
    private houseService: HouseServiceService,
    // for sending requests to server
  ) { // initializing default values (null and empty strings)
    this.defaultHouse = new DefaultHouse();
  }

  deleteHouse(houseId: number) {
    // find index which needed to be deleted
    const deleteIndex = this.houses.findIndex(house => house.id === houseId);
    // delete house from server and on subscribe return it back
    this.houseService.remove(houseId)
      .subscribe( // delete house from array
        () => this.houses.splice(deleteIndex, 1),
        (err: HttpErrorResponse) => { // if errors
          // TODO: Error message
          console.log(err.error);
        }
      );
  }
  ngOnInit() {

    // get house list from server
    this.houseService.get()
      .subscribe( // and put it into houses array to display
        (data: Array<House>) => this.houses = data,
        (err: HttpErrorResponse) => { // if errors
          // TODO: Error message
          console.log(err.error);
        });
  }

}
