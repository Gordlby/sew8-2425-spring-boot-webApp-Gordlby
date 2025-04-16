import { Component } from '@angular/core';
import { GroceryItem } from '../grocery-item';
import { ApireqService } from '../apireq.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  list: GroceryItem[] = [
    /* {
      id: 1,
      name: "Apple",
      amount: 6,
      collected: false
    },
    {
      id: 2,
      name: "Weckerl",
      amount: 3,
      collected: false
    },
    {
      id: 3,
      name: "Milch",
      amount: 2,
      collected: false
    },
    {
      id: 4,
      name: "Joghurt",
      amount: 2,
      collected: false
    },
    {
      id: 5,
      name: "Karotten",
      amount: 4,
      collected: false
    },
    {
      id: 6,
      name: "Zucchini",
      amount: 2,
      collected: false
    },
    {
      id: 7,
      name: "Käse",
      amount: 1,
      collected: false
    },
    {
      id: 8,
      name: "Müsli",
      amount: 1,
      collected: false
    },
    {
      id: 9,
      name: "Mehl",
      amount: 1,
      collected: false
    },
    {
      id: 10,
      name: "Eier",
      amount: 10,
      collected: false
    },
    {
      id: 11,
      name: "Honig",
      amount: 1,
      collected: false
    },
    {
      id: 12,
      name: "Apfelsaft",
      amount: 2,
      collected: false
    },
    {
      id: 13,
      name: "Zucker",
      amount: 1,
      collected: false
    },
    {
      id: 14,
      name: "Brokkoli",
      amount: 1,
      collected: false
    },
    {
      id: 15,
      name: "Kartoffel",
      amount: 4,
      collected: false
    },
    {
      id: 16,
      name: "Butter",
      amount: 1,
      collected: false
    } */
  ];
  

  constructor(private groceryService: ApireqService) { }
  ngOnInit() {
    this.updateItemList();
  }


  onDelete(id: number) {
    this.groceryService.deleteItem(id);
    this.list = this.list.filter(item => item.id !== id);
    
  }

  updateItemList() {
    this.groceryService.getHome().subscribe((data: GroceryItem[]) => {
      this.list = data;
    });
  }

}
