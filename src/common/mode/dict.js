class Dict {// 字典
    constructor() {
        this.items = {};
    }

    has(key) {
        return this.items.hasOwnProperty(key);
    }

    set(key, value) {
        this.items[key] = value;
    }

    remove(key) {
        if (!this.has(key)) return false;
        delete this.items[key];
    }

    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    }

    keys() {
        return Object.keys(this.items);
    }

    values() {
        return Object.values(this.items);
    }

    size() {
        return this.keys().length;
    }

    clear() {
        this.items = {};
    }
}

/**
set(key,value) 向字典中添加新元素。
remove(key) 通过使用键值来从字典中移除键值对应的数据值。
has(key) 如果某个键值存在于这个字典中，则返回 true，反之则返回 false。
get(key) 通过键值查找特定的数值并返回。
clear() 将这个字典中的所有元素全部删除。
size() 返回字典所包含元素的数量。与数组的 length 属性类似。
keys() 将字典所包含的所有键名以数组形式返回。
values() 将字典所包含的所有数值以数组形式返回。
 */