/**
 * Unit tests for HttpClient single-resource response handling
 *
 * Covers the guard against IT Glue returning a 2xx response whose `data`
 * member is an empty array or missing entirely. Without the guard, the
 * single-resource helpers silently resolve `undefined` typed as T, which
 * is especially dangerous on write paths (POST/PATCH): the write landed,
 * the caller crashes on property access, and a retry duplicates the record.
 */

import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server.js';
import { HttpClient } from '../../src/http.js';
import { resolveConfig } from '../../src/config.js';
import { ITGlueError } from '../../src/errors.js';

const BASE_URL = 'https://api.itglue.com';

interface Widget {
  id: string;
  type: string;
  name: string;
}

const widgetResource = {
  id: '1',
  type: 'widgets',
  attributes: {
    name: 'Widget One',
  },
};

function createClient(): HttpClient {
  return new HttpClient(
    resolveConfig({ apiKey: 'ITG.test-api-key', region: 'us' })
  );
}

describe('HttpClient', () => {
  describe('getOne', () => {
    it('should return the resource for a single-object data response', async () => {
      server.use(
        http.get(`${BASE_URL}/widgets/1`, () =>
          HttpResponse.json({ data: widgetResource })
        )
      );

      const widget = await createClient().getOne<Widget>('/widgets/1');

      expect(widget.id).toBe('1');
      expect(widget.name).toBe('Widget One');
    });

    it('should return the first resource for an array-of-one data response', async () => {
      server.use(
        http.get(`${BASE_URL}/widgets/1`, () =>
          HttpResponse.json({ data: [widgetResource] })
        )
      );

      const widget = await createClient().getOne<Widget>('/widgets/1');

      expect(widget.id).toBe('1');
      expect(widget.name).toBe('Widget One');
    });

    it('should throw ITGlueError when data is an empty array', async () => {
      server.use(
        http.get(`${BASE_URL}/widgets/1`, () => HttpResponse.json({ data: [] }))
      );

      const promise = createClient().getOne<Widget>('/widgets/1');

      await expect(promise).rejects.toThrow(ITGlueError);
      await expect(promise).rejects.toThrow(
        'IT Glue returned no resource for GET /widgets/1'
      );
    });

    it('should throw ITGlueError when the response has no data member', async () => {
      server.use(
        http.get(`${BASE_URL}/widgets/1`, () => HttpResponse.json({}))
      );

      const promise = createClient().getOne<Widget>('/widgets/1');

      await expect(promise).rejects.toThrow(ITGlueError);
      await expect(promise).rejects.toThrow(
        'IT Glue returned no resource for GET /widgets/1'
      );
    });
  });

  describe('postAndDeserialize', () => {
    it('should return the resource for a single-object data response', async () => {
      server.use(
        http.post(`${BASE_URL}/widgets`, () =>
          HttpResponse.json({ data: widgetResource })
        )
      );

      const widget = await createClient().postAndDeserialize<Widget>(
        '/widgets',
        'widgets',
        { name: 'Widget One' }
      );

      expect(widget.id).toBe('1');
      expect(widget.name).toBe('Widget One');
    });

    it('should return the first resource for an array-of-one data response', async () => {
      server.use(
        http.post(`${BASE_URL}/widgets`, () =>
          HttpResponse.json({ data: [widgetResource] })
        )
      );

      const widget = await createClient().postAndDeserialize<Widget>(
        '/widgets',
        'widgets',
        { name: 'Widget One' }
      );

      expect(widget.id).toBe('1');
      expect(widget.name).toBe('Widget One');
    });

    it('should throw ITGlueError when data is an empty array', async () => {
      server.use(
        http.post(`${BASE_URL}/widgets`, () => HttpResponse.json({ data: [] }))
      );

      const promise = createClient().postAndDeserialize<Widget>(
        '/widgets',
        'widgets',
        { name: 'Widget One' }
      );

      await expect(promise).rejects.toThrow(ITGlueError);
      await expect(promise).rejects.toThrow(
        'IT Glue returned no resource for POST /widgets'
      );
    });

    it('should throw ITGlueError when the response has no data member', async () => {
      server.use(
        http.post(`${BASE_URL}/widgets`, () => HttpResponse.json({}))
      );

      const promise = createClient().postAndDeserialize<Widget>(
        '/widgets',
        'widgets',
        { name: 'Widget One' }
      );

      await expect(promise).rejects.toThrow(ITGlueError);
      await expect(promise).rejects.toThrow(
        'IT Glue returned no resource for POST /widgets'
      );
    });
  });

  describe('patchAndDeserialize', () => {
    it('should return the resource for a single-object data response', async () => {
      server.use(
        http.patch(`${BASE_URL}/widgets/1`, () =>
          HttpResponse.json({ data: widgetResource })
        )
      );

      const widget = await createClient().patchAndDeserialize<Widget>(
        '/widgets/1',
        'widgets',
        '1',
        { name: 'Widget One' }
      );

      expect(widget.id).toBe('1');
      expect(widget.name).toBe('Widget One');
    });

    it('should return the first resource for an array-of-one data response', async () => {
      server.use(
        http.patch(`${BASE_URL}/widgets/1`, () =>
          HttpResponse.json({ data: [widgetResource] })
        )
      );

      const widget = await createClient().patchAndDeserialize<Widget>(
        '/widgets/1',
        'widgets',
        '1',
        { name: 'Widget One' }
      );

      expect(widget.id).toBe('1');
      expect(widget.name).toBe('Widget One');
    });

    it('should throw ITGlueError when data is an empty array', async () => {
      server.use(
        http.patch(`${BASE_URL}/widgets/1`, () =>
          HttpResponse.json({ data: [] })
        )
      );

      const promise = createClient().patchAndDeserialize<Widget>(
        '/widgets/1',
        'widgets',
        '1',
        { name: 'Widget One' }
      );

      await expect(promise).rejects.toThrow(ITGlueError);
      await expect(promise).rejects.toThrow(
        'IT Glue returned no resource for PATCH /widgets/1'
      );
    });

    it('should throw ITGlueError when the response has no data member', async () => {
      server.use(
        http.patch(`${BASE_URL}/widgets/1`, () => HttpResponse.json({}))
      );

      const promise = createClient().patchAndDeserialize<Widget>(
        '/widgets/1',
        'widgets',
        '1',
        { name: 'Widget One' }
      );

      await expect(promise).rejects.toThrow(ITGlueError);
      await expect(promise).rejects.toThrow(
        'IT Glue returned no resource for PATCH /widgets/1'
      );
    });
  });
});
