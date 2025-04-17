import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroceryItem } from '../grocery-item';
import { ApireqService } from '../apireq.service';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  id: number;
  item: GroceryItem | undefined;
  nameInput: String = '';
  amountInput: number = 0;
  collectedInput: Boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private groceryService: ApireqService) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
  }

  ngAfterViewInit() {
    this.updateItemList();
    setTimeout(() => this.onNameInput(), 1000);
  }

  updateItemList() {
    this.groceryService.getItem(this.id).subscribe((data: GroceryItem) => {
      this.item = data;
      this.nameInput = data.name;
      this.amountInput = data.amount;
      this.collectedInput = data.collected;
    });
  }

  onDelete() {
    if (!this.item) return;
    this.groceryService.deleteItem(this.item.id);
    //this.router.navigate(['/']);
    this.item = undefined;
  }


  onNameInput() {
    const input = document.getElementById('inputname') as HTMLInputElement;
    this.nameInput = input.value;
  }
  onAmountInput() {
    const input = document.getElementById('inputamount') as HTMLInputElement;
    this.amountInput = parseInt(input.value);
  }
  onCollectedInput() {
    const input = document.getElementById('inputcollected') as HTMLInputElement;
    this.collectedInput = input.checked;
  }
  onCommit() {
    let item: GroceryItem = {
      id: this.id,
      name: this.nameInput,
      amount: this.amountInput,
      collected: this.collectedInput
    };
    this.groceryService.updateItem(item).subscribe((data: GroceryItem) => {
      this.item = data;
    }
    );
  }


}
