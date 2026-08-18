export function generateSquareSeal(academyName: string): Promise<File> {
  return new Promise((resolve) => {
    const size = 300;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, size, size);

    const sealColor = '#DC2626'; // Deep Red
    const padding = 16;
    const strokeWidth = 8;
    const innerPadding = 6;
    const innerStrokeWidth = 3;

    // Outer Rectangle
    ctx.strokeStyle = sealColor;
    ctx.lineWidth = strokeWidth;
    ctx.strokeRect(padding, padding, size - padding * 2, size - padding * 2);

    // Inner Rectangle
    ctx.lineWidth = innerStrokeWidth;
    ctx.strokeRect(
      padding + strokeWidth + innerPadding,
      padding + strokeWidth + innerPadding,
      size - (padding + strokeWidth + innerPadding) * 2,
      size - (padding + strokeWidth + innerPadding) * 2,
    );

    // Format text: Clean name + "의인" or "인"
    let text = academyName.trim();
    if (!text.endsWith('인')) {
      text = text.endsWith('학원') ? `${text}의인` : `${text}학원인`;
    }

    // Split text into 2~3 columns/rows for seal look
    const chars = Array.from(text);
    const count = chars.length;

    ctx.fillStyle = sealColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (count <= 4) {
      // 2x2 Grid (traditional top-to-bottom, right-to-left)
      ctx.font = 'bold 52px "Noto Serif KR", "Batang", "Apple SD Gothic Neo", serif';
      const positions = [
        { x: size * 0.72, y: size * 0.32 },
        { x: size * 0.72, y: size * 0.68 },
        { x: size * 0.28, y: size * 0.32 },
        { x: size * 0.28, y: size * 0.68 },
      ];
      chars.forEach((char, idx) => {
        if (positions[idx]) {
          ctx.fillText(char, positions[idx].x, positions[idx].y);
        }
      });
    } else if (count <= 6) {
      // 3x2 Grid (3 rows, 2 cols)
      ctx.font = 'bold 42px "Noto Serif KR", "Batang", "Apple SD Gothic Neo", serif';
      const positions = [
        { x: size * 0.72, y: size * 0.25 },
        { x: size * 0.72, y: size * 0.5 },
        { x: size * 0.72, y: size * 0.75 },
        { x: size * 0.28, y: size * 0.25 },
        { x: size * 0.28, y: size * 0.5 },
        { x: size * 0.28, y: size * 0.75 },
      ];
      chars.forEach((char, idx) => {
        if (positions[idx]) {
          ctx.fillText(char, positions[idx].x, positions[idx].y);
        }
      });
    } else {
      // 3x3 Grid
      ctx.font = 'bold 34px "Noto Serif KR", "Batang", "Apple SD Gothic Neo", serif';
      const colWidth = (size - 60) / 3;
      const rowHeight = (size - 60) / Math.ceil(count / 3);
      chars.forEach((char, idx) => {
        const col = 2 - (idx % 3);
        const row = Math.floor(idx / 3);
        const x = 30 + col * colWidth + colWidth / 2;
        const y = 30 + row * rowHeight + rowHeight / 2;
        ctx.fillText(char, x, y);
      });
    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `${academyName}_사각직인.png`, { type: 'image/png' });
      resolve(file);
    }, 'image/png');
  });
}

export function generateCircleSeal(academyName: string): Promise<File> {
  return new Promise((resolve) => {
    const size = 300;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, size, size);

    const sealColor = '#DC2626';
    const center = size / 2;
    const outerRadius = size / 2 - 16;
    const innerRadius = outerRadius - 12;

    // Outer Circle
    ctx.strokeStyle = sealColor;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(center, center, outerRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Circle
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(center, center, innerRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Small star or center decorative circle
    const coreRadius = innerRadius * 0.48;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(center, center, coreRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Center text "직인" or "대표인"
    ctx.fillStyle = sealColor;
    ctx.font = 'bold 36px "Noto Serif KR", "Batang", "Apple SD Gothic Neo", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('직인', center, center);

    // Text curved on top arc
    const chars = Array.from(academyName.trim());
    const charCount = chars.length;
    const startAngle = Math.PI * 0.65;
    const endAngle = Math.PI * 2.35;
    const angleStep = (endAngle - startAngle) / Math.max(charCount - 1, 1);

    ctx.font = 'bold 24px "Noto Serif KR", "Batang", "Apple SD Gothic Neo", serif';
    const textRadius = innerRadius - 16;

    chars.forEach((char, i) => {
      const angle = startAngle + i * angleStep;
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle - Math.PI / 2);
      ctx.fillText(char, 0, -textRadius);
      ctx.restore();
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `${academyName}_원형직인.png`, { type: 'image/png' });
      resolve(file);
    }, 'image/png');
  });
}
