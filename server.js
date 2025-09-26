const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 정적 파일 제공
app.use(express.static('public'));
app.use(express.json());

// 메인 페이지
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 파일 관리 페이지
app.get('/file-manager', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'file-manager.html'));
});

// 폴더 내 파일 목록 조회
app.post('/get-files', (req, res) => {
    try {
        const { folderPath } = req.body;
        
        if (!folderPath) {
            return res.status(400).json({ error: '폴더 경로를 입력해주세요.' });
        }

        // 경로가 존재하는지 확인
        if (!fs.existsSync(folderPath)) {
            return res.status(400).json({ error: '존재하지 않는 경로입니다.' });
        }

        // 폴더인지 확인
        const stat = fs.statSync(folderPath);
        if (!stat.isDirectory()) {
            return res.status(400).json({ error: '폴더 경로가 아닙니다.' });
        }

        // 파일 목록 읽기
        const files = fs.readdirSync(folderPath);
        
        // 파일 정보와 함께 정렬
        const fileInfos = files
            .map(file => {
                const filePath = path.join(folderPath, file);
                const stat = fs.statSync(filePath);
                return {
                    name: file,
                    path: filePath,
                    isDirectory: stat.isDirectory(),
                    size: stat.size,
                    modified: stat.mtime
                };
            })
            .filter(file => !file.isDirectory) // 파일만 필터링
            .sort((a, b) => a.name.localeCompare(b.name)); // 이름순 정렬

        res.json({ 
            success: true, 
            files: fileInfos,
            folderPath: folderPath
        });
        
    } catch (error) {
        console.error('파일 목록 조회 중 오류:', error);
        res.status(500).json({ error: '파일 목록을 불러올 수 없습니다.' });
    }
});

// 파일 이름 일괄 변경
app.post('/rename-files', (req, res) => {
    try {
        const { folderPath, newBaseName, selectedFiles, startNumber } = req.body;
        
        if (!folderPath || !newBaseName || !selectedFiles || selectedFiles.length === 0) {
            return res.status(400).json({ error: '필수 정보가 누락되었습니다.' });
        }

        const startNum = parseInt(startNumber) || 1;
        const renamedFiles = [];
        const errors = [];

        selectedFiles.forEach((fileName, index) => {
            try {
                const oldPath = path.join(folderPath, fileName);
                const fileExtension = path.extname(fileName);
                const currentNumber = startNum + index;
                const paddedNumber = currentNumber.toString().padStart(3, '0');
                const newFileName = `${newBaseName}${paddedNumber}번${fileExtension}`;
                const newPath = path.join(folderPath, newFileName);

                // 파일이 존재하는지 확인
                if (fs.existsSync(oldPath)) {
                    fs.renameSync(oldPath, newPath);
                    renamedFiles.push({
                        original: fileName,
                        new: newFileName
                    });
                } else {
                    errors.push(`파일을 찾을 수 없습니다: ${fileName}`);
                }
            } catch (error) {
                errors.push(`${fileName}: ${error.message}`);
            }
        });

        res.json({ 
            success: true, 
            message: `${renamedFiles.length}개 파일의 이름이 변경되었습니다.`,
            renamedFiles: renamedFiles,
            errors: errors
        });
        
    } catch (error) {
        console.error('파일 이름 변경 중 오류:', error);
        res.status(500).json({ error: '파일 이름 변경 중 오류가 발생했습니다.' });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});