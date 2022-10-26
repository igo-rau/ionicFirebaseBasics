import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes = [];
  constructor(private dataService: DataService, private alertCtrl: AlertController) {
    this.dataService.getNotes().subscribe((res) => {
      console.log(res);
      this.notes = res;
    });
  }

  openNote(note) {
    
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'title',
          placeholder: 'Please enter the title',
          type: 'text'
        },
        {
          name: 'text',
          placeholder: 'Enter your note here',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addNote({title: res.title, text: res.text});
          }
        }
      ]
    });
    await alert.present();
  }
}
