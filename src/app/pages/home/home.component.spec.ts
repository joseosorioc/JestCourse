import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler";
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { HomeComponent } from "./home.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from '../../services/book.service';
import { Book } from "../../models/book.model";
import { of } from "rxjs/internal/observable/of";


const listBookTest: Book[] = [{
  id: "id1223",
  name: "libro1",
  author: "",
  isbn: "isbn-prueba",
  description: "this description",
  photoUrl: "http://myurl.com",
  price: 200,
  amount: 2
},
{
  id: "id4352",
  name: "libro2",
  author: "",
  isbn: "isbn-prueba2",
  description: "this description 2",
  photoUrl: "http://myurl.com",
  price: 20,
  amount: 5
},

{
  id: "id9987",
  name: "libro3",
  author: "",
  isbn: "isbn-prueba3",
  description: "this description 3",
  photoUrl: "http://myurl.com",
  price: 40,
  amount: 10
}

]

const bookServiceMock = {
  getBooks: () => of(listBookTest)
};

// creamos el Pipe Test
@Pipe({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform{
  transform() : string {
    return '';
  }
}


describe( 'Home Component', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;


beforeEach( () => {

  TestBed.configureTestingModule({

    imports: [
      HttpClientTestingModule
    ],
    declarations: [
      HomeComponent,
      ReduceTextPipeMock // Se añade el pipe.
                         // A tener en cuenta: cada que se añada un pipe en el componente
                         // se debe de añadir tambien en el Test
    ],
    providers: [
      // BookService
      {
        provide: BookService,
        useValue: bookServiceMock
      }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
  }).compileComponents() ;

});


beforeEach( () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});



it('should test Homecomponent is created correctly' , () => {
    expect(component).toBeTruthy();
});

it( 'should getBooks with suscription Observable.', () => {
    const bookService = fixture.debugElement.injector.get(BookService);

    // verficamos que se llame correctamente el metodo getBooks del servicio.
    // mockeamos ese observable con retorno y con el of(que es un metodo de rxJs que transforma en
    // observable nos manda ese observable, luego probamos lo que está dentro.
   // const spy1 = jest.spyOn(bookService, 'getBooks').mockReturnValueOnce(of(listBookTest));

    component.getBooks();
   // expect(spy1).toHaveBeenCalledTimes(1);

    // comprobamos si es igual a la longitud de la lista que
    // pasamos. así:
    expect(component.listBook.length).toBe(3);

    // con este ToEqual comparamos objetos.
    expect(component.listBook).toEqual(listBookTest);

});



/**
 *
 * * El XIT: se agrega en las pruebas para saltarlas, ejemplo:
 * xit( 'should getBooks with suscription Observable.', () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    component.getBooks();
    expect(component.listBook.length).toBe(3);
    expect(component.listBook).toEqual(listBookTest);
});

  * El FIT: permite lanzar el test que está anotado con 'fit'
    los demas no se lanzaran, ejemplo:

    fit( 'should getBooks with suscription Observable.', () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    component.getBooks();
    expect(component.listBook.length).toBe(3);
    expect(component.listBook).toEqual(listBookTest);

  * it.only: es exactamente lo mismo que fit. ejemplo:

    fit.only( 'should getBooks with suscription Observable.', () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    component.getBooks();
    expect(component.listBook.length).toBe(3);
    expect(component.listBook).toEqual(listBookTest);

});

**/



});
