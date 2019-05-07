import {types} from 'mobx-state-tree';

const AppStore = types
    .model('Common', {
        loading: types.boolean,
    });

const _app_ = AppStore.create({loading: true});

export {_app_};