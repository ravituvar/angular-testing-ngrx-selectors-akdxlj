import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement }  from '@angular/core';

import { HelloComponent } from './hello.component';

//

describe('Integration::HelloComponent', () => {
  it('should display original title', () => {
    // given
    const { comp, el, fixture } = setup();

    // when
    fixture.detectChanges();

    // then 
    expect(el.textContent).toContain('Hello');
  });

  it('should display a different test title', () => {
    // given
    const { comp, el, fixture } = setup();
    comp.name = 'Test Title';

    // when
    fixture.detectChanges();

    // then
    expect(el.textContent).toContain('Test Title');
  });
});

//

function setup () {
  TestBed.configureTestingModule({
    declarations: [ HelloComponent ],
  });

  const fixture = TestBed.createComponent(HelloComponent);

  const comp = fixture.componentInstance;

  const de = fixture.debugElement;
  const el = de.nativeElement;

  return {comp, fixture, de, el}
}