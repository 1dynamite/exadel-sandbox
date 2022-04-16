import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { AccountService } from './account.service';
import { AddAccount, EditAccount, ReturnType, Params } from '../models';

describe('AccountService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let accountService: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [AccountService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    accountService = TestBed.inject(AccountService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#add account', () => {
    let expectedReply: ReturnType;

    const newAccount: AddAccount = {
      title: 'title test',
      description: 'description test',
      currency: {
        _id: 'string',
        name: 'string',
        symbol: 'string',
      },
    };

    const userId = '62560e1d1f0ed7a033f39371';

    beforeEach(() => {
      accountService = TestBed.inject(AccountService);
      expectedReply = {
        message: 'Account successfully created!',
        account: {
          ...newAccount,
          balance: 0,
        },
      } as ReturnType;
    });

    it('should return expected account (called once)', () => {
      accountService.addAccount(newAccount, userId).subscribe({
        next: (res) => expect(res).toEqual(expectedReply),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `/api/users/${userId}/accounts/`
      );
      expect(req.request.method).toEqual('POST');

      req.flush(expectedReply);
    });

    it('should return 400 due to identical titles for two accounts', () => {
      accountService.addAccount(newAccount, userId).subscribe({
        next: fail,
        error: (error: HttpErrorResponse) => {
          expect(error.error).toBe('Account title should be unique');
          expect(error.status).toBe(400);
        },
      });

      const req = httpTestingController.expectOne(
        `/api/users/${userId}/accounts/`
      );

      const msg = 'Account title should be unique';
      req.flush(msg, { status: 400, statusText: 'Invalid request' });
    });
  });

  describe('#update account', () => {
    const editAccount: EditAccount = {
      title: 'title test (updated)',
      description: 'description test',
      currency: {
        _id: 'string',
        name: 'string',
        symbol: 'string',
      },
    };

    const params: Params = {
      userId: '62560e1d1f0ed7a033f39371',
      accountId: '49560e1d1f0ed7a033f39385',
    };

    const reply: ReturnType = {
      message: 'Successfully updated!',
      account: {
        ...editAccount,
        balance: 0,
        _id: 'someid',
        transactions: 'someid',
      },
    };

    it('should update an account and return it', () => {
      accountService.editAccount(params, editAccount).subscribe({
        next: (data) => expect(data).toEqual(reply),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `/api/users/${params.userId}/accounts/` + params.accountId
      );
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(editAccount);

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: reply,
      });
      req.event(expectedResponse);
    });

    it('should turn 404 error', () => {
      accountService.editAccount(params, editAccount).subscribe({
        next: fail,
        error: (error: HttpErrorResponse) => {
          expect(error.error).toBe('Account not found');
          expect(error.status).toBe(404);
        },
      });

      const req = httpTestingController.expectOne(
        `/api/users/${params.userId}/accounts/` + params.accountId
      );

      const msg = 'Account not found';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#read account', () => {
    const params: Params = {
      userId: '62560e1d1f0ed7a033f39371',
      accountId: '49560e1d1f0ed7a033f39385',
    };

    const reply: ReturnType = {
      message: '',
      account: {
        title: 'title test (read)',
        description: 'description test',
        currency: {
          _id: 'string',
          name: 'string',
          symbol: 'string',
        },
        balance: 0,
        _id: 'someid',
        transactions: 'someid',
      },
    };

    it('should fetch an account', () => {
      accountService.readAccount(params).subscribe({
        next: (data) => expect(data).toEqual(reply),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `/api/users/${params.userId}/accounts/` + params.accountId
      );
      expect(req.request.method).toEqual('GET');

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: reply,
      });
      req.event(expectedResponse);
    });

    it('should turn 404 error', () => {
      accountService.readAccount(params).subscribe({
        next: fail,
        error: (error: HttpErrorResponse) => {
          expect(error.error).toBe('Account not found');
          expect(error.status).toBe(404);
        },
      });

      const req = httpTestingController.expectOne(
        `/api/users/${params.userId}/accounts/` + params.accountId
      );

      const msg = 'Account not found';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#delete account', () => {
    const params: Params = {
      userId: '62560e1d1f0ed7a033f39371',
      accountId: '49560e1d1f0ed7a033f39385',
    };

    const reply: ReturnType = {
      message: '',
      account: {
        title: 'title test (read)',
        description: 'description test',
        currency: {
          _id: 'string',
          name: 'string',
          symbol: 'string',
        },
        balance: 0,
        _id: 'someid',
        transactions: 'someid',
      },
    };

    it('should delete an account and return it', () => {
      accountService.deleteAccount(params).subscribe({
        next: (data) => expect(data).toEqual(reply),
        error: fail,
      });

      const req = httpTestingController.expectOne(
        `/api/users/${params.userId}/accounts/` + params.accountId
      );
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: reply,
      });
      req.event(expectedResponse);
    });

    it('should turn 404 error', () => {
      accountService.deleteAccount(params).subscribe({
        next: fail,
        error: (error: HttpErrorResponse) => {
          expect(error.error).toBe('Account not found');
          expect(error.status).toBe(404);
        },
      });

      const req = httpTestingController.expectOne(
        `/api/users/${params.userId}/accounts/` + params.accountId
      );

      const msg = 'Account not found';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });
});
