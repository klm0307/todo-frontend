import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { ListComponent } from './components/list/list.component';
import { TodoComponent } from './todo.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListComponent, TodoComponent],
  imports: [CommonModule, TodoRoutingModule, SharedModule],
})
export class TodoModule {}
