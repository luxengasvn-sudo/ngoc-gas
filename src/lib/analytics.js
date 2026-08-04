/**
 * Click tracking utility to log customer interactions (calls, Zalo chats, maps, product views)
 */
export const trackClick = async (type, target) => {
  try {
    // Send event in fire-and-forget style
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        click_type: type, 
        click_target: String(target || '').trim() 
      })
    });
  } catch (e) {
    console.error('Analytics tracking failed:', e);
  }
};
