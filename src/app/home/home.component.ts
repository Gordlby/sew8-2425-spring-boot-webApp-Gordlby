import { Component } from '@angular/core';
import { GroceryItem } from '../grocery-item';
import { ApireqService } from '../apireq.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
  ],
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
  showAddItemOverlay: Boolean = false;

  formvars: FormGroup = new FormGroup({
    name: new FormControl("Item"),
    amount: new FormControl(0),
    collected: new FormControl(false)
  })
  

  constructor(private groceryService: ApireqService) { }
  ngOnInit() {
    this.updateItemList();
    this.showAddItemOverlay = false;
    this.formvars.reset();
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

  onAddItem() {
    const newItem: GroceryItem = {
      id: 0,
      name: this.formvars.get('name')?.value,
      amount: this.formvars.get('amount')?.value,
      collected: this.formvars.get('collected')?.value ?? false
    };
    console.log(newItem);
    this.groceryService.addItem(newItem).subscribe(() => {
      this.updateItemList();
      this.showAddItemOverlay = false;
    });
  }
  onAddItemOverlay() {
    this.showAddItemOverlay = true;
    console.log(this.showAddItemOverlay);
  }
  onCloseOverlay() {
    this.showAddItemOverlay = false;
    this.formvars.reset();
  }

}
