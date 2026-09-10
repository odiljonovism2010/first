'use client'
import { useState, useEffect } from 'react';
import { GoSearch } from "react-icons/go";

interface GitHubNotification {
  id: string;
  reason: string;
  unread: boolean;
  updated_at: string;
  subject: {
    title: string;
    url: string;
    type: string;
  };
  repository: {
    full_name: string;
  };
}

const Inbox = () => {
  const [notifications, setNotifications] = useState<GitHubNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBanner, setShowBanner] = useState<boolean>(true);

  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/notifications?all=true`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при загрузке уведомлений с GitHub');
        }

        const data = await response.json();
        setNotifications(data);
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'unread' && !item.unread) return false;
    if (searchQuery && !item.subject.title.toLowerCase().includes(searchQuery.toLowerCase()) && !item.repository.full_name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full sm:w-[92%] lg:w-[85%] h-full sm:h-[85%] mx-auto p-3 sm:p-6 font-sans antialiased text-gray-900 bg-white flex flex-col justify-start">
      
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3 mb-4 sm:mb-6 flex-shrink-0">
        
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md w-fit border border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'unread' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Unread
          </button>
        </div>

        <div className="flex-1 max-w-xl relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <GoSearch size={15} />
          </span>
          <input
            type="text"
            placeholder="Search notifications"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-white border border-gray-300 px-3 py-1.5 rounded-md text-xs sm:text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
            <span className="text-gray-500">Sort by:</span>
            <span className="font-medium">Newest</span>
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 bg-white border border-gray-300 px-3 py-1.5 rounded-md text-xs sm:text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
            <span className="text-gray-500">Group by:</span>
            <span className="font-medium">Date</span>
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>


      {showBanner && (
        <div className="bg-blue-50/50 border border-blue-200/80 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 mt-0.5 hidden sm:block">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-gray-900">Clear out the clutter.</h2>
              <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5">
                Get the most out of your new inbox by quickly marking read notifications as done.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setShowBanner(false)}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1 rounded-md text-xs font-medium transition-colors shadow-sm"
            >
              Dismiss
            </button>
            <button className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors shadow-sm">
              Get started
            </button>
          </div>
        </div>
      )}

      <div className="border border-gray-300 rounded-lg bg-white shadow-sm flex flex-col overflow-hidden flex-1">
        <div className="flex items-center px-4 py-2.5 border-b border-gray-200 bg-gray-50/70 text-xs font-medium text-gray-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
            <span className="cursor-pointer select-none">Select all</span>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="p-8 text-center text-sm text-gray-500">Загрузка уведомлений...</div>
          ) : error ? (
            <div className="p-8 text-center text-sm text-red-500">{error}</div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">Нет уведомлений</div>
          ) : (
            <div>
              {filteredNotifications.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-sm ${
                    index !== filteredNotifications.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0" />
                    <div className="text-purple-600 flex-shrink-0 hidden sm:block">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 truncate">
                      <span className="text-gray-600 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none inline-block">{item.repository.full_name}</span>
                      <span className="text-gray-400 mx-1">•</span>
                      <a href="#" className="font-medium text-gray-900 hover:text-blue-600 truncate text-xs sm:text-sm">
                        {item.subject.title}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 pl-3">
                    <span className="text-[11px] sm:text-xs text-gray-600 capitalize hidden md:inline">{item.reason.replace('_', ' ')}</span>
                    <span className="text-[11px] sm:text-xs text-gray-500 whitespace-nowrap">{formatDate(item.updated_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;