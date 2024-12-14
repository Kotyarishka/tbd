Усі моделі знаходяться в папці `prisma/schema.prisma`. Графічне представлення знаходиться [тут](https://github.com/Kotyarishka/tbd/blob/main/model.png).

## Лабораторна 2.1

### Відображення та додавання:

- https://github.com/Kotyarishka/tbd/blob/main/index.ts#L44-L63
- https://github.com/Kotyarishka/tbd/blob/main/index.ts#L77-L99
- https://github.com/Kotyarishka/tbd/blob/main/index.ts#L113-L132

### Запити

- JOIN: https://github.com/Kotyarishka/tbd/blob/main/index.ts#L164-L173

## Лабораторна 2.2

### Моделі

- https://github.com/Kotyarishka/tbd/blob/main/prisma/schema.prisma

### Міграції

- https://github.com/Kotyarishka/tbd/tree/main/prisma/migrations

## Лабораторна 2.3

### Видалення

- https://github.com/Kotyarishka/tbd/blob/main/index.ts#L65-L75
- https://github.com/Kotyarishka/tbd/blob/main/index.ts#L101-L111
- https://github.com/Kotyarishka/tbd/blob/main/index.ts#L134-L144
- https://github.com/Kotyarishka/tbd/blob/main/index.ts#L183-L193
- https://github.com/Kotyarishka/tbd/blob/main/index.ts#L235-L245

### Каскад

- https://github.com/Kotyarishka/tbd/blob/main/prisma/schema.prisma#L31
- https://github.com/Kotyarishka/tbd/blob/main/prisma/schema.prisma#L41
- https://github.com/Kotyarishka/tbd/blob/main/prisma/schema.prisma#L43
- и так далі.

## Лабораторна 2.4

- Explicit Loading: https://github.com/Kotyarishka/tbd/blob/main/index.ts#L57 (завантажуеться лише список кінотеатрів)
- Eager Loading: https://github.com/Kotyarishka/tbd/blob/main/index.ts#L164-L173 та https://github.com/Kotyarishka/tbd/blob/main/index.ts#L212-L225 (завантажуються потрібні дані згідно відношень)
- Lazy Loading: https://github.com/Kotyarishka/tbd/blob/main/index.ts#L195-L209 та https://github.com/Kotyarishka/tbd/blob/main/index.ts#L163-L181 (завантажуються окремо дані для відображення квитків та сеансів, коли це потрібно)
