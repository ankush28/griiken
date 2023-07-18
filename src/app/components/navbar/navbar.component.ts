import { Component, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(200) // Adjust the duration as needed (e.g., 200ms)
      ])
    ])
  ]
})
export class NavbarComponent {
  activeSection: string | null = '';
  isMenuOpen = false;
  isNavbarFixed = false;
  offset = 200;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateNavbarFixed();
    this.updateActiveSection();
  }
  
  updateNavbarFixed() {
    const scrollPosition = window.pageYOffset;
    
    this.isNavbarFixed = scrollPosition > 0;
  }

  scrollToSection(sectionId: string) {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Element with ID '${sectionId}' not found.`);
    }
  }
  updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset + this.offset; // Add offset here

    // Find the currently visible section based on the section IDs
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        if (sectionId !== this.activeSection) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }
}
