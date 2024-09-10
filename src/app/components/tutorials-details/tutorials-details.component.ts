import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-details',
  templateUrl: './tutorials-details.component.html',
  styleUrls: ['./tutorials-details.component.css']
})
export class TutorialsDetailsComponent implements OnInit{
  @Input() viewMode = false;
  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(private tutorialService: TutorialService,private activatedRute: ActivatedRoute,private router: Router ){}
  
  ngOnInit(): void {
    if(!this.viewMode){
      this.message = '';
      this.getTutorial(this.activatedRute.snapshot.params['id']);
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      next: (data)=>{
        this.currentTutorial = data;
        console.log(data)
      },
      error: (e)=>console.error(e)
    })
  }

  updatePublished(status: boolean): void {
        const data = {
          title: this.currentTutorial.title,
          description: this.currentTutorial.description,
          published: status
        };
        this.message = '';
        this.tutorialService.update(this.currentTutorial.id, data).subscribe({
          next: (res) => {
            console.log(res);
            this.currentTutorial.published = status;
            this.message = res.message
              ? res.message
              : 'The status was updated successfully!';
          },
          error: (e) => console.error(e)
        });
      }

  updateTutorial(): void{
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
        ? res.message
        : 'This tutorial was updated successfully';
      },
      error: (e)=> console.error(e)
    })
  }

  deleteTutorial(): void{
    this.tutorialService.delete(this.currentTutorial.id).subscribe({
      next: (res)=>{
        console.log(res);
        this.router.navigate(['/tutorials'])
        
      },
      error: (e) => console.error(e) 
    })
  }
}
// import { Component, OnInit, Input, input } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Tutorial } from '../../models/tutorial.model';
// import { TutorialService } from '../../services/tutorial.service';
// @Component({
//   selector: 'app-tutorial-details',
//   templateUrl: './tutorial-details.component.html',
//   styleUrl: './tutorial-details.component.css'
// })
// export class TutorialDetailsComponent implements OnInit {
//   @Input() viewMode = false;
//   @Input() currentTutorial: Tutorial = {
//     title: '',
//     description: '',
//     published: false
//   };
//   message = '';
//   constructor(
//     private tutorialService: TutorialService,
//     private activatedRoute: ActivatedRoute,
//     private router: Router
//   ) {}
//   ngOnInit(): void {
//       if (!this.viewMode) {
//         this.message = '';
//         this.getTutorial(this.activatedRoute.snapshot.params['id']);
//       }
//   }
//   getTutorial(id: string): void {
//     this.tutorialService.get(id).subscribe({
//       next: (data) => {
//         this.currentTutorial = data;
//         console.log(data);
//       },
//       error: (e) => console.error(e)
//     });
//   }
//   updatePublished(status: boolean): void {
//     const data = {
//       title: this.currentTutorial.title,
//       description: this.currentTutorial.description,
//       published: status
//     };
//     this.message = '';
//     this.tutorialService.update(this.currentTutorial.id, data).subscribe({
//       next: (res) => {
//         console.log(res);
//         this.currentTutorial.published = status;
//         this.message = res.message
//           ? res.message
//           : 'The status was updated successfully!';
//       },
//       error: (e) => console.error(e)
//     });
//   }
//   updateTutorial(): void {
//     this.message = '';
//     this.tutorialService
//       .update(this.currentTutorial.id, this.currentTutorial)
//       .subscribe({
//         next: (res) => {
//           console.log(res);
//           this.message = res.message
//             ? res.message
//             : 'This tutorial was updated successfully!';
//         },
//         error: (e) => console.error(e)
//       });
//   }
//   deleteTutorial(): void {
//     this.tutorialService.delete(this.currentTutorial.id).subscribe({
//       next: (res) => {
//         console.log(res);
//         this.router.navigate(['/tutorials']);
//       },
//       error: (e) => console.error(e)
//     });
//   }
// }
