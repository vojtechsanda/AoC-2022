def load_data():
    data = []
    with open("input.txt", "r") as f:
        for line in f:
            cur = []
            for char in line.strip():
                cur.append(int(char))
            data.append(cur)
    return data


def generate_matrix(forest):
    res = []
    for _ in range(len(forest)):
        res.append([False for _ in range(len(forest[0]))])
    return res


def get_count(matrix):
    count = 0
    for row in matrix:
        for col in row:
            if col:
                count += 1
    return count


def first(forest):
    matrix = generate_matrix(forest)

    for i in range(len(forest)):
        l_highest, r_highest = forest[i][0], forest[i][-1]
        matrix[i][0], matrix[i][-1] = True, True

        for j in range(len(forest[i])):
            if forest[i][j] > l_highest:
                l_highest = forest[i][j]
                matrix[i][j] = True
            if forest[i][-1 - j] > r_highest:
                r_highest = forest[i][-1 - j]
                matrix[i][-1 - j] = True

    for j in range(len(forest[0])):
        u_highest, d_highest = forest[0][j], forest[-1][j]
        matrix[0][j], matrix[-1][j] = True, True

        for i in range(len(forest)):
            if forest[i][j] > u_highest:
                u_highest = forest[i][j]
                matrix[i][j] = True
            if forest[-1 - i][j] > d_highest:
                d_highest = forest[-1 - i][j]
                matrix[-1 - i][j] = True

    return get_count(matrix)


def get_score(distances):
    score = 1
    for dist in distances:
        score *= dist
    return score


def second(forest):
    highest_score = 0
    for i in range(1, len(forest) - 1):
        for j in range(1, len(forest[0]) - 1):
            cur_height = forest[i][j]
            distances = [0, 0, 0, 0]  # up, left, down, right

            for k in range(i - 1, -1, -1):
                distances[0] += 1
                if forest[k][j] >= cur_height:
                    break

            for l in range(j - 1, -1, -1):
                distances[1] += 1
                if forest[i][l] >= cur_height:
                    break

            for m in range(i + 1, len(forest)):
                distances[2] += 1
                if forest[m][j] >= cur_height:
                    break

            for n in range(j + 1, len(forest[0])):
                distances[3] += 1
                if forest[i][n] >= cur_height:
                    break

            cur_score = get_score(distances)
            highest_score = max(highest_score, cur_score)

    return highest_score


if __name__ == '__main__':
    data = load_data()
    print(first(data))
    print(second(data))
