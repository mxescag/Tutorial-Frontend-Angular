import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/Category';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-list',
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './category-list.page.html',
  styleUrl: './category-list.page.scss',
})
export class CategoryListPage implements OnInit {
  dataSource = new MatTableDataSource<Category>(); /* Aquí se almacenarán los datos que se mostrarán en la tabla. */
  displayedColumns: string[] = ['id', 'name', 'action']; /* Aquí se definen las columnas que se mostrarán en la tabla. */

  constructor() {}

  ngOnInit(): void {} /* Aquí se pueden cargar los datos desde un servicio o API. */
}
