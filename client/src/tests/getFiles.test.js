import { getFiles } from '../utils/getFiles';

describe('Function getFiles', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should retrieval files successfully', async () => {
        const mockFiles = [
            { uid: '1', name: 'file1.txt', user: 'User1', size: 1024, date: new Date(), category: 'category1', difficulty: 'easy' },
            { uid: '2', name: 'file2.txt', user: 'User2', size: 2048, date: new Date(), category: 'category2', difficulty: 'hard' }
        ];

        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ files: mockFiles }),
        });

        const data = await getFiles();

        expect(data.files).toHaveLength(mockFiles.length);
        expect(data.files).toEqual(expect.arrayContaining(mockFiles));
    });

    test('should handle errors gracefully', async () => {
        const mockError = new Error('Failed to fetch files');
    
        global.fetch.mockRejectedValue(mockError);
    
        await expect(getFiles()).rejects.toThrow('Failed to fetch files');
    });
});
