// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  console.log(initialState)
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
