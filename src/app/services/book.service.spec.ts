import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from "./book.service";
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from '../models/book.model';
import { environment } from "../../environments/environment.prod";
import Swal from "sweetalert2";


describe('book service ', () => {

  // servicio
  let service: BookService;

  // variable que es utilizada para hacer las peticiones mock
  let httpMock : HttpTestingController;

  let listBooks: Book[] = [
    {
      id: "123",
      name: "Robinson crussoe",
      author: "Charles",
      isbn: "2EET",
      description: "aventures book",
      photoUrl: "http://urlimage/book",
      price: 20,
      amount: 2
    },
    {
      id: "124",
      name: "make your bed",
      author: "W. McRaven",
      isbn: "2EET",
      description: "motivations book",
      photoUrl: "http://urlimage/book",
      price: 10,
      amount: 4
    },
    {
      id: "125",
      name: "My life",
      author: "Jose Osorio",
      isbn: "2EET",
      description: "autobiograph book",
      photoUrl: "http://urlimage/book",
      price: 20,
      amount: 2
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          BookService
        ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA,
          NO_ERRORS_SCHEMA
        ]
    });
  });

  afterEach( () => {
    localStorage.clear();
    jest.resetAllMocks();
  })

  beforeEach( () => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  afterEach( () => {
      httpMock.verify();
  });

  test('should create service' , () => {
    expect(service).toBeTruthy();
  });


  /**
   * public getBooks(): Observable<Book[]> {
     const url: string = environment.API_REST_URL + `/book`;
     return this._httpClient.get<Book[]>(url);
  }
   */

  test('should test getbooks return book list', () => {

     service.getBooks().subscribe((res: Book[]) => {
          expect(res).toEqual(listBooks);
     });

     const req = httpMock.expectOne(environment.API_REST_URL + '/book');
     expect(req.request.method).toBe('GET');
     req.flush(listBooks);

  });


  test('getBooksFromCart return a empty array when localstorage is empty', () => {
      const listBook = service.getBooksFromCart();
      expect(listBook.length).toBe(0);

  });

  test('get books from cart return books array when exists in localstarage', () => {
      localStorage.setItem('listCartBook', JSON.stringify(listBooks));
      const newListBook = service.getBooksFromCart();
      expect(newListBook.length).toBe(3);
  });



  test('addBooktoCart when the list no exists in the LocalStorage', () => {

    const book: Book = {
      id: "123",
      name: "Robinson crussoe",
      author: "Charles",
      isbn: "2EET",
      description: "aventures book",
      photoUrl: "http://urlimage/book",
      price: 20,
      amount: 2
    }

    const toastMock = {
      fire: () => null
    } as any;

    let newListBook = service.getBooksFromCart();
    expect(newListBook.length).toBe(0);
    const spy1 = jest.spyOn(Swal, 'mixin').mockImplementation( () => {
        return toastMock;
    });
    service.addBookToCart(book);
    newListBook = service.getBooksFromCart();
    expect(newListBook.length).toBe(1);
    expect(spy1).toHaveBeenCalledTimes(1);

  });


  // probamos cuando exitan datos en el localstorage.

  test('addBooktoCart when the list exists in the LocalStorage', () => {

    localStorage.setItem('listCartBook', JSON.stringify(listBooks));

    const book: Book =     {
      id: "125",
      name: "My life",
      author: "Jose Osorio",
      isbn: "2EET",
      description: "autobiograph book",
      photoUrl: "http://urlimage/book",
      price: 20,
      amount: 2
    }

    const toastMock = {
      fire: () => null
    } as any;

    const spy1 = jest.spyOn(Swal, 'mixin').mockImplementation( () => {
        return toastMock;
    });

    expect(listBooks[2].amount).toBe(2);
    service.addBookToCart(book);
    let newListBook = service.getBooksFromCart();
    expect(newListBook[2].amount).toBe(3);
    expect(spy1).toHaveBeenCalledTimes(1);
  });


  /**
   *   public removeBooksFromCart(): void {
    localStorage.setItem('listCartBook', null);
  }

   */

  test('test removeBooksFromCart', () => {

    localStorage.setItem('listCartBook', JSON.stringify(listBooks));
    const booksInLocalStorage = service.getBooksFromCart();
    expect(booksInLocalStorage.length).toBe(3);

    service.removeBooksFromCart();

    expect(service.getBooksFromCart()).toEqual([]);

  });






});
