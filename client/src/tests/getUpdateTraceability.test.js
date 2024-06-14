import { getUpdateTraceability } from '../utils/getUpdateTraceability';

describe('getUpdateTraceability function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should update traceability for a valid user successfully', async () => {
    const mockResponse = {
      ok: true,
      msg: 'Trazabilidad actualizada'
    };

    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const traceabilityUpdates = {
      uid: 123,
      hashEasyTask1: 1,
      hashEasyTask2: 1,
      hashEasyTask3: 1,
      hashHardTask1: 1,
      hashHardTask2: 1,
      steganographyEasyTask1: 1,
      steganographyHardTask1: 1,
      phishingEasyTask1: 1,
      phishingHardTask1: 1
    };

    const response = await getUpdateTraceability(traceabilityUpdates);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/updateTraceability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(traceabilityUpdates),
    });

    expect(response).toEqual(mockResponse);
  });

  test('should handle errors gracefully', async () => {
    const mockErrorResponse = {
      ok: false,
      status: 500,
      json: () => Promise.resolve({ ok: false, msg: 'Por favor hable con el administrador' })
    };

    global.fetch.mockResolvedValue(mockErrorResponse);

    const traceabilityUpdates = {
      uid: 123,
      hashEasyTask1: 1,
      hashEasyTask2: 1,
      hashEasyTask3: 1,
      hashHardTask1: 1,
      hashHardTask2: 1,
      steganographyEasyTask1: 1,
      steganographyHardTask1: 1,
      phishingEasyTask1: 1,
      phishingHardTask1: 1
    };

    const response = await getUpdateTraceability(traceabilityUpdates);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/updateTraceability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(traceabilityUpdates),
    });

    expect(response).toEqual({ ok: false, msg: 'Por favor hable con el administrador' });
  });
});
