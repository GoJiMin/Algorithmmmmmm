function solution(my_string, is_suffix) {
    return my_string.indexOf(is_suffix) + is_suffix.length === my_string.length ? 1 : 0
}