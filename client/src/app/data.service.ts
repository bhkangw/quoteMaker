import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute, Router } from '@angular/router';
import "Rxjs";
import { BehaviorSubject } from 'Rxjs';

@Injectable()
export class DataService {
  user: string; 
  quotes: Array<object> = [];
  quoteObserver = new BehaviorSubject(this.quotes)

  constructor(private _http: Http) { }

  login(user, cb){
    console.log("passing through service")
    this._http.post("/login", user).subscribe(res => {
      this.user = res.json();
      console.log("yoooo",this.user)
      cb(res.json())
    })
  }

  checkSess(cb){
    this._http.get("/sess").subscribe(res => {
      console.log("session in service");
      cb(res.json());
    })
  }

  addQuote(quote, cb){
    console.log("quotttteee",quote)
    this._http.post("/addQuote", quote).subscribe(res => {
      this.quotes = res.json();
      console.log("adding quote!!!!!!!!")
      this.quoteObserver.next(this.quotes);
    })
  }

  showAll(){
    this._http.get("/showAll").subscribe(res => {
      this.quotes = res.json();
      this.quoteObserver.next(this.quotes);
    })
  }
  

}
