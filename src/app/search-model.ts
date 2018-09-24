
export class SearchHint {
    constructor(
        public type: 'GROUP' | 'ITEM',
        public label: string,
        public actions?: SearchHintAction[]
    ) {}
}

export class SearchHintGroup extends SearchHint {
    constructor(label: string, public items: SearchHintItem[], actions?: SearchHintAction[]) {
        super('GROUP', label, actions);
    }
}

export class SearchHintItem extends SearchHint {
    constructor(label: string, actions?: SearchHintAction[]) {
        super('ITEM', label, actions);
    }
}

export class SearchHintAction {
    constructor(public label: string, public handler: () => void) {}
}
