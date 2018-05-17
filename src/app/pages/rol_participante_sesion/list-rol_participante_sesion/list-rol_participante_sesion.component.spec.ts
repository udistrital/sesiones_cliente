/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListRolParticipanteSesionComponent } from './list-rol_participante_sesion.component';

describe('ListRolParticipanteSesionComponent', () => {
  let component: ListRolParticipanteSesionComponent;
  let fixture: ComponentFixture<ListRolParticipanteSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRolParticipanteSesionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRolParticipanteSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
