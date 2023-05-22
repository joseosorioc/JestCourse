import { CartComponent } from "./cart.component";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Book } from "src/app/models/book.model";

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

describe('Cart component', () => {
  let componentCar: CartComponent;
  let fixture: ComponentFixture<CartComponent> ;

  beforeEach( () => {
    // esto muy similar a los modulos, mas como de configuracion.
     TestBed.configureTestingModule({
        imports: [
         HttpClientTestingModule
        ],
        declarations: [
            // Colocamos el componente que vamos a probar en nuestro test;

            CartComponent
        ],
        providers: [
            // aqui van los servicios que utiliza el component
            BookService
        ],
        schemas: [

            CUSTOM_ELEMENTS_SCHEMA,
            NO_ERRORS_SCHEMA
        ]
     });
  });

  // otro before each para instanciar el componente.
  beforeEach( () => {
    fixture = TestBed.createComponent(CartComponent);
    componentCar = fixture.componentInstance;
    fixture.detectChanges();
  })

  // first test

  // comprobar que el componente se ha creado correctamente.

  it('should create component', () => {
     expect(componentCar).toBeTruthy();
  })


  test('should test getTotalPrice return amount', () => {
    let totalPrice = componentCar.getTotalPrice(listBookTest);

    expect(totalPrice).toBeGreaterThan(0);

  });







});



/**
 * CUSTOM_ELEMENTS_SCHEMA: Este esquema se utiliza cuando tienes componentes
 *  que utilizan elementos web personalizados, como elementos de interfaz de
 *  usuario de terceros o elementos web creados por ti mismo. Al habilitar
 * este esquema en las pruebas, Angular permite el uso de estos elementos
 * personalizados sin lanzar errores relacionados con el desconocimiento de
 *  los elementos web no nativos de Angular. Esto es útil cuando no necesitas
 *  interactuar con los elementos personalizados en las pruebas y solo deseas
 * asegurarte de que los componentes se rendericen correctamente.

NO_ERRORS_SCHEMA: Este esquema se utiliza cuando no deseas realizar ninguna
verificación de los componentes secundarios (hijos) dentro del componente que
estás probando. Al habilitar este esquema, Angular ignora cualquier elemento
o atributo desconocido dentro de los componentes secundarios y evita lanzar
errores. Esto puede ser útil cuando te centras en probar el componente principal
y no quieres enfrentarte a errores relacionados con los componentes secundarios.
 */
