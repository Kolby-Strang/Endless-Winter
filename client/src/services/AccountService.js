import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { resortsService } from './ResortsService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async getProfile(accountId) {
    try {
      const res = await api.get(`/account/${accountId}`)
      AppState.activeProfile = new Account(res.data)
      AppState.activeProfileSki = res.data.skier
      AppState.activeProfileSno = res.data.snowBoarder
      await resortsService.getFavoriteResorts(res.data.favorites)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async updateAccount(editable) {
    const res = await api.put(`/account`, editable)
    // logger.log(res.data)
  }

  async getPosts() {
    const res = await api.get(`/account/posts`)
    logger.log(res.data)
  }
}

export const accountService = new AccountService()
