import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; // service
import { Router } from '@angular/router'; // router
import { Quote } from "../quote" // class

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: string;
  quote: Quote = new Quote();
  quotes: Array<object> = [];

  constructor(private _dataService: DataService, private _router: Router) {
    this._dataService.quoteObserver.subscribe((quotes) => {
      this.quotes = quotes;
    })
  }

  checkSess(){
    this._dataService.checkSess(res => {
      this.user = res;
      if(!this.user){
        console.log("cant find")
        this._router.navigate(["/"]);
      }
    })
  }

  addQuote(quote) {
    this.quote.name = this.user;
    console.log("What", this.quote)
    this._dataService.addQuote(this.quote, res => {
      console.log("quote back in comp")
    })
  }

  ngOnInit() {
    this.checkSess()
    this._dataService.showAll()
  }

}
