import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import AccountEditor from '../components/account-editor';
import type { AppDispatch, RootState } from '../services';
import { createCompositeAccountId } from '../services/accounts';
import { fetchAllAccounts as fetchAllSbankenAccounts } from '../services/sbanken';
import { fetchAllAccounts as fetchAllYnabAccounts } from '../services/ynab';

export function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    void dispatch(fetchAllSbankenAccounts());
    void dispatch(fetchAllYnabAccounts());
  }, [dispatch]);

  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  return (
    <div class="h-screen flex overflow-hidden">
      <div class="fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true">
        {/* TODO: mobile sidebar */}
      </div>
      <div class="hidden md:flex md:flex-shrink-0">
        <div class="flex flex-col w-64">
          <div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div class="flex items-center flex-shrink-0 px-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Sbanken → YNAB</h3>
              </div>
              <nav class="mt-5 flex-1 px-2 bg-white space-y-1">
                {accounts.map((account) => {
                  const accountId = createCompositeAccountId(account);
                  return (
                    <NavLink
                      key={accountId}
                      className="flex-shrink-0 flex border-t border-gray-200 p-4"
                      to={`/accounts/${accountId}`}
                    >
                      <div class="flex-shrink-0 w-full group block">
                        <p class="font-medium text-gray-700 group-hover:text-gray-900">
                          {account.name}
                        </p>
                        {/* <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                          Vis transaksjoner
                        </p> */}
                      </div>
                    </NavLink>
                  );
                })}
                <NavLink
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 flex items-center font-medium"
                  to="/accounts/new"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Legg til konto
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-0 flex-1 overflow-hidden">
        <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Open sidebar</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <Switch>
            <Route
              path="/accounts/:accountId"
              render={(routeProps) => (
                <AccountEditor accountId={routeProps.match.params.accountId} />
              )}
            />
          </Switch>
          {/* <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 class="text-2xl font-semibold text-gray-900">Navn på konto og noen stats</h1>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div class="py-4">Transaksjoner her</div>
              <div class="mt-12">
                <p>Midlertidig knapp for å fjerne og nullstille</p>
                <Button
                  className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-pink-500"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Fjern data og nullstill
                </Button>
              </div>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  );
}