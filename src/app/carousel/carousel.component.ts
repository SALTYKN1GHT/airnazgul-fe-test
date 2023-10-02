import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  public images: { imgurl: string; alt: string }[] = [
    { imgurl: '../assets/images/carousel/argonath.png', alt: 'Argonath' },
    { imgurl: '../assets/images/carousel/calas_galadhon.png', alt: 'Calas Galadhon' },
    { imgurl: '../assets/images/carousel/dol_amroth.png', alt: 'Dol Amroth' },
    { imgurl: '../assets/images/carousel/dol_guldur.png', alt: 'Dol Guldur' },
    { imgurl: '../assets/images/carousel/edoras.png', alt: 'Edoras' },
    { imgurl: '../assets/images/carousel/helms_deep.png', alt: "Helm's Deep" },
    { imgurl: '../assets/images/carousel/isengard.png', alt: 'Isengard' },
    { imgurl: '../assets/images/carousel/lonely_mountain.png', alt: 'Lonely Mountain' },
    { imgurl: '../assets/images/carousel/minas_tirith.png', alt: 'Minas Tirith' },
    { imgurl: '../assets/images/carousel/mount_doom.png', alt: 'Mount Doom' },
    { imgurl: '../assets/images/carousel/rivendell.png', alt: 'Rivendell' },
    { imgurl: '../assets/images/carousel/shire.png', alt: 'Shire' },
  ];
}
