import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';
import { takeWhile, map } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isComponentAlive: boolean;
  // subscription: Subscription = null;
  inputStreamData = ['john wick', 'inception', 'interstellar'];
  outputStreamData = [];
  // 1st step 
  streamsOutput$: Observable<number[]>;

  constructor() { }

  ngOnInit() {
    this.startStream();
  }

  // ngOnDestroy() {
  //   this.stopStream();
  // }

  startStream() {
    const streamSource = interval(1500);
    const secondStreamSource = interval(3000);
    const fastestStreamSource = interval(500);
    this.streamsOutput$ = merge(
      streamSource,
      secondStreamSource,
      fastestStreamSource
    ).pipe(
      takeWhile(() => !!this.isComponentAlive),
      map(output => {
        console.log(output)
        //step 2 - combining 3 streams into 1
        this.outputStreamData = [...this.outputStreamData, output]
        return this.outputStreamData;
      })
    )
    streamSource
      .pipe(
        takeWhile(() => !!this.isComponentAlive)
      ).subscribe(input => {
      this.outputStreamData.push(input);
      console.log('stream output', input)
    });
    secondStreamSource
      .pipe(
        takeWhile(() => !!this.isComponentAlive)
      ).subscribe(input => {
        this.outputStreamData.push(input);
        console.log('second stream output', input)
      });
    fastestStreamSource
      .pipe(
        takeWhile(() => !!this.isComponentAlive)
      ).subscribe(input => {
        this.outputStreamData.push(input);
        console.log('fastest stream output', input)
      });
  }

  // stopStream() {
  //   this.isComponentAlive = false;
  // }
}
