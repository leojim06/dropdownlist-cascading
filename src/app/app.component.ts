import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Country } from './country';
import { State } from './state';
import { CountryService } from './country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  form: FormGroup;
  countriesList: Country[];
  statesList: State[];

  option: any;

  selectSub: Subscription;

  constructor(
    private countryService: CountryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      country: [null, Validators.required],
      state: [null, Validators.required]
    });
    this.selectSub = this.form.controls['country'].valueChanges
      .subscribe((selectedCountry: Country) => {
        if (selectedCountry) {
          this.statesList = this.countryService
            .getStates()
            .filter((state: State) =>
              state.countryid === selectedCountry.id);
        } else {
          this.statesList = null;
          this.form.controls['state'].setValue(null);
        }
      });
  }

  ngOnInit() {
    this.countriesList = this.countryService.getCountries();
  }

  ngOnDestroy() {
    this.selectSub.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

}
