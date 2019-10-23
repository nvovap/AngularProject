import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { OrganizationService } from 'app/services/data/organization.service';
import { Organization } from '../organization';

@Component({
  selector: 'app-orgonisation-logo',
  templateUrl: './orgonisation-logo.component.html',
  styleUrls: ['./orgonisation-logo.component.scss']
})
export class OrgonisationLogoComponent implements OnInit {

  fileNotUpload = false
  fileUploud = false
  imageRef = ""

  
  linkFireStore = "";
  
  @Output() chageLinkLogo = new EventEmitter<String>();


  constructor(private afStorage: AngularFireStorage, private organizationSer: OrganizationService) { }

  ngOnInit() {
    this.organizationSer.getOrganization().subscribe(
      result => {
        var organisation = Object.assign(new Organization(), result[0])
        this.linkFireStore = organisation.linkToLogo
        console.log("OrgonisationLogoComponent")
        if (this.linkFireStore == "") {
          var nip = organisation.NIP
          if (nip == "") {
            nip = Math.random().toString(36).substring(2)
          }
          this.linkFireStore = "organisationLogos/" + nip;
        }
        this.downloadLogo()
      }
    )

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

    //const id = Math.random().toString(36).substring(2);

    //var link = "organisationLogos/" + Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(this.linkFireStore);
    this.task = this.ref.put(event.target.files[0])

    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));

    this.uploadProgress = this.task.percentageChanges();
    this.task.then(snap => {
      this.fileNotUpload = false
      this.chageLinkLogo.emit(this.linkFireStore);
      this.downloadLogo()
    })

  }

}
