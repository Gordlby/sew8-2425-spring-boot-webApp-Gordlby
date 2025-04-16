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

  onDelete(id: number) {
    this.groceryService.deleteItem(id);
    this.router.navigate(['/']);
  }


  onNameInput() {
    const input = document.getElementById('inputname') as HTMLInputElement;
    const mirror = input.parentElement?.querySelector('.input-mirror-name') as HTMLElement
    if (mirror && event) {
      mirror.textContent = input.value || '';
      input.style.width = mirror.offsetWidth + 'px';
    }
  }
  onAmountInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.amountInput = parseInt(input.value);
  }
  onCollectedInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.collectedInput = input.checked;
  }


}
