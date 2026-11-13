class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;

        vector<int> v(26, 0);

        // Net balance: +1 for s, -1 for t. All slots must cancel to 0.
        for (int i = 0; i < (int)s.length(); i++) {
            v[s[i] - 'a']++;
            v[t[i] - 'a']--;
        }

        for (int x : v) {
            if (x != 0) return false;
        }

        return true;
    }
};
