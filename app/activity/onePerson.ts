// Firebase Observable Demo App
// Kyle Cordes, Oasis Digital

// This component displays a single entry from Firebase on the screen.
// there is an unsolved problem, noted below.

import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as Firebase from 'firebase';

import {fbName} from './fbConfig';
import {observableFirebaseObject, NgWhen} from 'angular2-firebase';

@Component({
  selector: 'one-person',
  template: `
  <div>
    <b>Person {{id}}:</b>
    <p>{{ person | async | json }}</p>
    <p>
      <span *ngWhen="#p is person | async">{{p.name}}</span>
      (uses ngWhen)</p>
  </div>
  `,
  directives: [NgWhen]
})
export class OnePerson implements OnInit {
  @Input()
  id: string;
  person: Observable<any>;

  ngOnInit() {
    // This can't be called in the constructor because the properties
    // from the parent template are not yet populated.
    this.person = observableFirebaseObject(new Firebase(fbName)
      .child("stuff")
      .child("cat1")
      .child(this.id));
  }
}
