import { getAvatars } from '../utils/getAvatars';

describe('Function getAvatars', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should retrieval avatar successfully', async () => {
        const mockUid = '123';
    
        const mockBlob = new Blob(['Text file'], { type: 'text/plain' });
        const mockFile = new File([mockBlob], `${mockUid}.png`, { type: 'image/png' });
    
        global.fetch.mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(mockFile)
        });
    
        const response = await getAvatars({
            uid: mockUid
        });
    
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/getAvatars', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: mockUid
            }),
          });
    
          expect(response instanceof Blob).toBe(true);
          const fileName = mockFile.name;
          expect(fileName).toEqual(`${mockUid}.png`);
    });

    test('should retrieval default avatar successfully', async () => {
        const mockUid = '456';
    
        const mockBlob = new Blob(['Text file'], { type: 'text/plain' });
        const mockFile = new File([mockBlob], "0.png", { type: 'image/png' });
    
        global.fetch.mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(mockFile)
        });
    
        const response = await getAvatars({
            uid: mockUid
        });
    
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/getAvatars', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: mockUid
            }),
          });
    
          expect(response instanceof Blob).toBe(true);
          const fileName = mockFile.name;
          expect(fileName).toEqual("0.png");
    });

    test('should handle errors gracefully', async () => {
        const mockUid = '789';

        global.fetch.mockRejectedValue(new Error('Network error'));

        await expect(getAvatars({
            uid: mockUid
        })).rejects.toThrow('Network error');

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/getAvatars', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: mockUid
            }),
          });
    });
});
