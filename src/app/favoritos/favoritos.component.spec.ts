import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoritosComponent } from './favoritos.component';
import { HttpClientModule } from '@angular/common/http';

describe('FavoritosComponent', () => {
  let component: FavoritosComponent;
  let fixture: ComponentFixture<FavoritosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritosComponent],
      imports: [ReactiveFormsModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(FavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
