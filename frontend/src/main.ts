import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient,withInterceptors} from '@angular/common/http';
import {Component,inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';

const API='/api';

@Component({
selector:'app-root',standalone:true,imports:[FormsModule,CommonModule],
template:`
@if(page==='admin'){
<section class="admin">
 @if(!loggedIn){
  <div class="login card">
   <div class="heart">🔐</div><span class="eyebrow">PRIVATE ADMIN</span><h1>Welcome back</h1>
   <input [(ngModel)]="login.username" placeholder="Username">
   <input [(ngModel)]="login.password" type="password" placeholder="Password">
   <button class="submit" (click)="loginAdmin()" [disabled]="loading">Login</button>
   @if(error){<p class="error">{{error}}</p>}<button class="link" (click)="page='home'">← Back to invitation</button>
  </div>
 } @else {
  <div class="admin-head"><div><span class="eyebrow">PRIVATE SPACE</span><h1>Pui pui's Responses ❤️</h1></div><button class="small" (click)="logout()">Logout</button></div>
  <div class="stats"><div><b>{{responses.length}}</b><span>Total</span></div><div><b>{{yesCount}}</b><span>Yes</span></div><div><b>{{maybeCount}}</b><span>Maybe</span></div></div>
  @for(r of responses;track r.id){
   <article class="response"><div class="response-top"><strong>{{r.answer==='YES'?'YES ❤️':'MAYBE 😏'}}</strong><button class="delete" (click)="remove(r.id)">Delete</button></div>
   <div class="grid"><span>📍 <b>Location</b><br>{{r.location||'—'}}</span><span>🕐 <b>Time</b><br>{{r.time||'—'}}</span><span>☕ <b>Place</b><br>{{r.place||'—'}}</span><span>✨ <b>Activity</b><br>{{r.activity||'—'}}</span><span>🌙 <b>Mood</b><br>{{r.mood||'—'}}</span></div>
   @if(r.message){<p class="message">“{{r.message}}”</p>}<small>{{r.submittedAt|date:'medium'}}</small></article>
  } @empty {<div class="empty">No responses yet.</div>}
 }
</section>
}@else{
<main class="page"><section class="card">
<div class="sparkles">✦ ✧ ✦</div><div class="heart">♥</div>
@if(!submitted){
<span class="eyebrow">A VERY IMPORTANT QUESTION</span><h1>Pui Pui, would you go on a date with me? 🌙</h1>
<p class="intro">No pressure. Just you, me, and maybe a little adventure. ❤️</p>
<div class="questions"><label>💗 Will you go on a date with me?</label>
<select [(ngModel)]="answer"><option value="" disabled>Select your answer</option><option value="YES">Yes ❤️</option><option value="MAYBE">Maybe 😏</option><option value="NO" disabled>No</option></select>
@if(answer){<div class="questions">
<div><label>📍 Where?</label><select [(ngModel)]="form.location"><option value="">Choose a location</option><option>Jaipur</option><option>Delhi</option><option>Gurugram</option><option>I'll decide 😌</option></select></div>
<div><label>🕐 When?</label><input type="time" [(ngModel)]="form.time"></div>
<div><label>☕ Where should we meet?</label><input [(ngModel)]="form.place" placeholder="Cafe, restaurant, park..."></div>
<div><label>✨ What sounds fun?</label><select [(ngModel)]="form.activity"><option value="">Choose one</option><option>Coffee & conversations ☕</option><option>Dinner & a walk 🌃</option><option>Long drive & music 🎶</option><option>Surprise me ✨</option></select></div>
<div><label>🌙 What's the vibe?</label><select [(ngModel)]="form.mood"><option value="">Choose a vibe</option><option>Casual</option><option>Dressy</option><option>Adventure</option><option>Whatever feels right</option></select></div>
<div><label>💌 Anything you want to say?</label><textarea [(ngModel)]="form.message" placeholder="Optional..."></textarea></div>
<button class="submit" [disabled]="loading||!form.location||!form.time||!form.place" (click)="submit()">{{loading?'Sending...':'Lock in the date ❤️'}}</button>
</div>}
</div>
}@else{<div class="success"><div class="big-heart">💗</div><h2>It's a date, Pui Pui!</h2><p>Your plans are officially on the calendar.</p><div class="summary"><b>{{form.place}}</b><br>{{form.location}} · {{form.time}}<br>{{form.activity}} · {{form.mood}}</div><p>Now I just have to figure out what to wear. 😄</p></div>}
@if(error){<p class="error">{{error}}</p>}
</section></main>}
`,
})
export class AppComponent{
private http=inject(HttpClient);
page:'home'|'admin'=window.location.pathname.startsWith('/admin')?'admin':'home';
loggedIn=false;loading=false;submitted=false;error='';answer='';
login={username:'',password:''};responses:any[]=[];
form={location:'',time:'',place:'',activity:'',mood:'',message:''};
get yesCount(){return this.responses.filter(x=>x.answer==='YES').length}
get maybeCount(){return this.responses.filter(x=>x.answer==='MAYBE').length}
submit(){this.loading=true;this.http.post(API+'/responses',{...this.form,answer:this.answer}).subscribe({next:()=>{this.submitted=true;this.loading=false},error:()=>{this.error='Could not send your response. Please try again.';this.loading=false}})}
loginAdmin(){this.loading=true;this.error='';this.http.post<any>(API+'/admin/login',this.login,{withCredentials:true}).subscribe({next:r=>{if(r.authenticated){this.loggedIn=true;this.loadAdmin()}else this.error='Invalid username or password';this.loading=false},error:()=>{this.error='Login failed';this.loading=false}})}
loadAdmin(){this.http.get<any[]>(API+'/admin/responses',{withCredentials:true}).subscribe({next:r=>this.responses=r,error:e=>{if(e.status===401)this.loggedIn=false}})}
remove(id:number){if(confirm('Delete this response?'))this.http.delete(API+'/admin/responses/'+id,{withCredentials:true}).subscribe(()=>this.loadAdmin())}
logout(){this.http.post(API+'/admin/logout',{}, {withCredentials:true}).subscribe(()=>{this.loggedIn=false;this.responses=[]})}
}
bootstrapApplication(AppComponent,{providers:[provideHttpClient()]});
