import { types } from 'mobx-state-tree';
import { requestService } from '../hoc/RequestService';

const AppStore = types
    .model('Common', {
        loading: true
    })

    .actions(self => ({
        setLoadingState() {
            self.loading = !self.loading;
        },
    }));
const _app_ = AppStore.create({ loading: true });

export { _app_ };