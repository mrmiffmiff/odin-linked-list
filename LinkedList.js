class Node {
    constructor(val = null) {
        this.value = val;
        this.nextNode = null;
    }

    // This is for my own purposes for testing
    toString() {
        return `This node has a value of ${this.value}`;
    }
}

export default class LinkedList {

    // From previous studies it's better to have a dummy node at the start, makes certain things easier so there aren't weird exceptions later on
    constructor() {
        this.h = new Node();
        this.t = this.h;
        this.amount = 0;
    }

    // In case where there's only the dummy, head and tail are the same, so head's next will still be set properly without changing the head pointer
    append(value) {
        this.t.nextNode = new Node(value);
        this.t = this.t.nextNode;
        this.amount++;
    }

    // Head should always point to the dummy, we get the actual head from its next, so inserting here is simple
    prepend(value) {
        const newNode = new Node(value);
        newNode.nextNode = this.h.nextNode;
        this.h.nextNode = newNode;
        if (!newNode.nextNode) {
            this.t = newNode;
        }
        this.amount++;
    }

    size() {
        return this.amount;
    }

    head() {
        if (this.amount <= 0) return null;
        else return this.h.nextNode;
    }

    tail() {
        if (this.amount <= 0) return null;
        else return this.t;
    }

    // I'm doing zero-indexing. Not sure this is a good idea but it's what I'm doing.
    at(index) {
        if (this.amount <= 0 || index < 0 || index >= this.amount) return null;
        let curr = this.h.nextNode;
        for (let i = 0; i < index; i++) {
            curr = curr.nextNode;
        }
        return curr;
    }

    pop() {
        if (this.amount <= 0) return null;
        let curr = this.h; // Actually need to start at the dummy, always the chance we're removing the last element
        while (curr.nextNode !== this.t) curr = curr.nextNode; // Move through until the very next one is our tail
        const ret = curr.nextNode; // could use tail, but whatever
        curr.nextNode = null; // Null out the next of the current
        this.t = curr; // Set tail pointer to the current.
        // The old tail will get garbage collected after we no longer have any refs to it, but either way it's no longer related
        this.amount--;
        return ret;
    }

    contains(value) {
        if (this.amount <= 0) return false;
        let curr = this.h.nextNode;
        while (curr) {
            if (curr.value === value) return true;
            curr = curr.nextNode;
        }
        return false;
    }

    find(value) {
        if (this.amount <= 0) return null;
        let curr = this.h.nextNode;
        let i = 0;
        while (curr) {
            if (curr.value === value) return i;
            curr = curr.nextNode;
            i++;
        }
        return null;
    }

    toString() {
        if (this.amount <= 0) return "null";
        let ret = "";
        let curr = this.h.nextNode;
        while (curr) {
            ret += `( ${curr.value} ) -> `;
            curr = curr.nextNode;
        }
        ret += "null";
        return ret;
    }

    insertAt(value, index) {
        if (this.amount <= 0 || index < 0 || index >= this.amount) {
            console.log("Out of bounds");
            return;
        };
        let curr = this.h;
        for (let i = 0; i < index; i++) {
            curr = curr.nextNode;
        }
        // From this we'll end up at the one just before that index, so curr.nextNode now represents that index
        // We need to set the new node's next to what's already at that index, and set current's next to the new node
        const newNode = new Node(value);
        newNode.nextNode = curr.nextNode;
        curr.nextNode = newNode;
    }

    removeAt(index) {
        if (this.amount <= 0 || index < 0 || index >= this.amount) {
            console.log("Out of bounds");
            return;
        };
        let curr = this.h;
        for (let i = 0; i < index; i++) {
            curr = curr.nextNode;
        }
        // From this we'll end up at the one just before that index, so curr.nextNode now represents that index
        // This is fairly straightforward, we just need to set our current's next to the existing next's next
        // Garbage collection should deal with the rest
        curr.nextNode = curr.nextNode.nextNode;
    }
}