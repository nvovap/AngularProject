import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-upload-logo',
  templateUrl: './upload-logo.component.html',
  styleUrls: ['./upload-logo.component.css']
})
export class UploadLogoComponent implements OnInit {

  fileNotUpload = false
  fileUploud = false
  imageRef = "/assets/img/templateImage.png"
    
  @Input() linkFireStore = "";
  @Input() linkFolder = "";
  
  @Output() chageLinkLogo = new EventEmitter<String>();


  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit() {
    if (this.linkFireStore != "") {
      this.imageRef = ""
    }
    if (this.linkFireStore != "") {
        this.downloadLogo()
    } else {
      this.fileNotUpload = true
    }
  }

  downloadLogo() {
    const ref = this.afStorage.ref(this.linkFireStore);
    ref.getDownloadURL().subscribe(data => {
      this.imageRef = data
      this.fileNotUpload = false
      this.fileUploud = true
    }, error => {
      console.log(error)
      if (error.code == "storage/object-not-found") {
        this.fileNotUpload = true
        this.fileUploud = false
      }
    })
  }

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  upload(event) {
    
    this.linkFireStore = this.linkFolder + "/" + Math.random().toString(36).substring(2)
    this.ref = this.afStorage.ref(this.linkFireStore);
    this.task = this.ref.put(event.target.files[0])

    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));

    this.uploadProgress = this.task.percentageChanges();
    this.task.then(snap => {
      console.log("Upload OK")
      this.fileNotUpload = false

      this.chageLinkLogo.emit(this.linkFireStore);

      this.downloadLogo()
    })

  }

}
