import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { AlertService, BaseComponent, DIALOG_DATA, DialogRef } from "@pim-final/components";
import { BaterPontoFormGroup } from "@pim-final/forms";
import { CartaoPontoService, UsuarioService } from "@pim-final/services";
import axios from 'axios';
import { take } from "rxjs";

@Component({
    selector: 'rh-controle-web-cad-ponto',
    templateUrl: './modal-cad-ponto.component.html',
    styleUrls: ['./modal-cad-ponto.component.scss'],
  })
  export class ModalCadPontoComponent extends BaseComponent implements OnInit {

    @ViewChild('videoElement') videoElement!: ElementRef;
    base64Image = '';

    form: BaterPontoFormGroup = new BaterPontoFormGroup();

    latitude!: number;
    longitude!: number;
    endereco = '';

    constructor(
      @Inject(DIALOG_DATA) public data: any,
      private dialogRef: DialogRef,
      private alertService: AlertService,
      private usuarioService: UsuarioService,
      private cartaoPontoService: CartaoPontoService
    ) {
      super();
      this.form.usuarioId.setValue(this.usuarioService.getId());
    }
  
    ngOnInit() {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          this.videoElement.nativeElement.srcObject = stream;
        })
        .catch((error) => {
            this.alertService.show({ title: 'Erro!', subtitle: 'Erro ao acessar a câmera', status: 'erro' });
        });
        this.getLocation();
    }

    getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              this.getEndereco();
            },
            (error) => {
              this.alertService.show({ title: 'Erro!', subtitle: 'Erro ao obter a localização', status: 'erro' });
            }
          );
        } else {
            this.alertService.show({ title: 'Erro!', subtitle: 'Geolocalização não suportada pelo navegador.', status: 'erro' });
        }
    }

    getEndereco() {
      const apiKey = '9a7808d3988e4631b654f3432289362c';
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${this.latitude}+${this.longitude}&key=${apiKey}`;
  
      axios.get(apiUrl)
        .then((response) => {
          const result = response.data.results[0];
          this.endereco = result.formatted;
          this.form.endereco.setValue(this.endereco);
        })
        .catch((error) => {
          this.alertService.show({ title: 'Erro!', subtitle: 'Erro ao obter o endereço', status: 'erro' });
        });
    }

    fechar() {
      if(this.base64Image == ''){
        const video = this.videoElement.nativeElement;
        const videoStream = video.srcObject as MediaStream;
        const tracks = videoStream.getTracks();
        tracks.forEach(track => track.stop());
      }
      this.dialogRef.close(false);
    }

    takePicture() {
      if(this.base64Image == ''){
        const video = this.videoElement.nativeElement;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');

        if (context)
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Converta para base64
        this.base64Image = canvas.toDataURL('image/png');

        const videoStream = video.srcObject as MediaStream;
        const tracks = videoStream.getTracks();
        tracks.forEach(track => track.stop());
      } else {
        this.base64Image = '';

        navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            this.videoElement.nativeElement.srcObject = stream;
        })
        .catch((error) => {
            this.alertService.show({ title: 'Erro!', subtitle: 'Erro ao acessar a câmera', status: 'erro' });
        });
      }
    }

    salvar(){
      this.form.imagem.setValue(this.base64Image);
      if(this.form.valid){
          this.cartaoPontoService.salvarHorarioPonto(this.form.value)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              if(data.sucesso){
                if(this.base64Image == ''){
                  const video = this.videoElement.nativeElement;
                  const videoStream = video.srcObject as MediaStream;
                  const tracks = videoStream.getTracks();
                  tracks.forEach(track => track.stop());
                }
                this.dialogRef.close(true);
              }
            },
            error: (err) => {
              this.alertService.show({ title: 'Erro!', subtitle: err.error.erros[0], status: 'erro' });
            }
          });
      }
    }
}