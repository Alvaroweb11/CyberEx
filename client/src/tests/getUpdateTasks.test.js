import { getUpdateTasks } from '../utils/getUpdateTasks';

describe('getUpdateTasks function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should update task points for a valid user successfully', async () => {
    const mockResponse = {
      ok: true,
      points: 100,
      hashEasyTask1: 10,
      hashEasyTask2: 20,
      hashEasyTask3: 30,
      hashHardTask1: 40,
      hashHardTask2: 50,
      steganographyEasyTask1: 60,
      steganographyHardTask1: 70,
      phishingEasyTask1: 80,
      phishingHardTask1: 90,
      msg: 'Puntos actualizados'
    };

    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const taskUpdates = {
      uid: 123,
      points: 100,
      hashEasyTask1: 10,
      hashEasyTask2: 20,
      hashEasyTask3: 30,
      hashHardTask1: 40,
      hashHardTask2: 50,
      steganographyEasyTask1: 60,
      steganographyHardTask1: 70,
      phishingEasyTask1: 80,
      phishingHardTask1: 90
    };

    const response = await getUpdateTasks(taskUpdates);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/updatePoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskUpdates),
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

    const taskUpdates = {
      uid: 123,
      points: 100,
      hashEasyTask1: 10,
      hashEasyTask2: 20,
      hashEasyTask3: 30,
      hashHardTask1: 40,
      hashHardTask2: 50,
      steganographyEasyTask1: 60,
      steganographyHardTask1: 70,
      phishingEasyTask1: 80,
      phishingHardTask1: 90
    };

    const response = await getUpdateTasks(taskUpdates);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/auth/updatePoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskUpdates),
    });

    expect(response).toEqual({ ok: false, msg: 'Por favor hable con el administrador' });
  });
});
