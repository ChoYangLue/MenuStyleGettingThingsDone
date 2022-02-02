using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Microsoft.Web.WebView2.Core;

namespace WebExp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            InitializeWebViewAsync();
        }

        async void InitializeWebViewAsync()
        {
            await webView.EnsureCoreWebView2Async(null);
            //webView.CoreWebView2.WebMessageReceived += CoreWebView2_WebMessageReceived;

            LoadPath(Environment.CurrentDirectory+$"/Assets/index.html");
        }

        private void CoreWebView2_WebMessageReceived(object sender, CoreWebView2WebMessageReceivedEventArgs e)
        {
            //textEditor.Text = e.TryGetWebMessageAsString();
        }

        public  void LoadPath(string path)
        {
            // 実行ディレクトリを取得
            var currentDirectory = Environment.CurrentDirectory;

            // ローカルファイルのURIを作成
            var uri = new Uri($"{currentDirectory}/Assets/index.html");

            // WebView2にローカルファイルのURIを設定
            webView.CoreWebView2.Navigate(uri.AbsoluteUri);

        }
    }
}
