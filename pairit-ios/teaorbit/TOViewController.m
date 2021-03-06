//
//  TOViewController.m
//  teaorbit
//
//  Created by Murat Ayfer on 12/11/2013.
//  Copyright (c) 2013 tea orbit. All rights reserved.
//

#import "TOViewController.h"
#import "WebViewJavascriptBridge.h"

@interface TOViewController () {
    WebViewJavascriptBridge* bridge;
}
@property (strong, nonatomic) IBOutlet UIWebView *TOWebView;

@end

@implementation TOViewController

- (BOOL)prefersStatusBarHidden {
    return YES;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [[UIApplication sharedApplication] setStatusBarHidden:YES
                                            withAnimation:UIStatusBarAnimationFade];

    _TOWebView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
    NSLog(@"Frame size %f by %f", self.view.frame.size.width, self.view.frame.size.height);
    /*
    NSString *url = @"http://safinaz.local/~murat/Code/pairit/man.html";
    NSURL *nsurl = [NSURL URLWithString:url];
    NSURLRequest *nsrequest = [NSURLRequest requestWithURL:nsurl];
    [_TOWebView loadRequest:nsrequest];
    */
    NSURL *htmlFile = [[NSBundle mainBundle] URLForResource:@"man" withExtension:@"html"];
    NSLog(@"file: %@", htmlFile);
    
    NSURLRequest *urlReq = [NSURLRequest requestWithURL:htmlFile];
    [_TOWebView loadRequest:urlReq];
    
    [self.view addSubview:_TOWebView];

    _TOWebView.delegate = self;
    __block float rotation = 1.0;
    bridge = [WebViewJavascriptBridge bridgeForWebView:_TOWebView handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"Received message from javascript: %@", data);
        if([data isEqualToString:@"flip"]) {
            _TOWebView.layer.transform = CATransform3DMakeRotation(M_PI, 0, 0, rotation);
            if(rotation == 1.0) {
                rotation = 0.0;
            } else {
                rotation = 1.0;
            }
        }
        if([data isEqualToString:@"unflip"]) {
            _TOWebView.layer.transform = CATransform3DMakeRotation(M_PI, 0, 0, 0.0);
            rotation = 1.0;
        }
        responseCallback(@"Right back atcha");
    }];
    
    if ([self respondsToSelector:@selector(edgesForExtendedLayout)])
        self.edgesForExtendedLayout = UIRectEdgeNone;
    
    
    [_TOWebView setAutoresizingMask: UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight];
    
    _TOWebView.scrollView.scrollEnabled = NO;
    _TOWebView.scrollView.bounces = NO;
    
}


- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation{
    return (toInterfaceOrientation == UIInterfaceOrientationLandscapeLeft);
}
-(BOOL)shouldAutorotate {
    return YES;
}
- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskLandscapeLeft;
}

- (void)willAnimateRotationToInterfaceOrientation: (UIInterfaceOrientation)toInterfaceOrientation duration:(NSTimeInterval)duration
{
    NSLog(@"Frame size AFTER %f by %f", self.view.frame.size.width, self.view.frame.size.height);
    [_TOWebView setFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
}


- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    
    [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
    
    NSLog(@"Attempting to send shiet");
    [bridge send:@"Well hello there"];
    [bridge send:[NSDictionary dictionaryWithObject:@"Foo" forKey:@"Bar"]];
    [bridge send:@"Give me a response, will you?" responseCallback:^(id responseData) {
        NSLog(@"ObjC got its response! %@", responseData);
    }];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request
 navigationType:(UIWebViewNavigationType)navigationType
{
    NSMutableDictionary *customHeaders = [NSMutableDictionary dictionary];
    [customHeaders setObject:@"iPhoneTeaOrbit" forKey:@"X-Requested-By"];
    
    // if we have no custom headers to set, just let the request load as normal
    if(customHeaders.count == 0)
    {
        return YES;
    }
    
    // use this flag to track if all custom headers have been set on the request object
    BOOL allHeadersProcessed = YES;
    
    // iterate through all specified custom headers
    for(NSString *customKey in [customHeaders allKeys])
    {
        // grab the value associated with the custom header
        NSString *customValue = (NSString *)[customHeaders objectForKey:customKey];
        
        // use this flag to mark if the custom header/value already exist on the request
        BOOL customHeaderProcessed = NO;
        
        // iterate through all the keys in the request
        for(NSString *existingKey in [[request allHTTPHeaderFields] allKeys])
        {
            // only compare keys which match (ignoring case as the UIWebView may alter case between requests)
            if([customKey caseInsensitiveCompare:existingKey] == NSOrderedSame)
            {
                // grab the value for the existing key - both key and value must match
                NSString *existingValue = (NSString *)[request valueForHTTPHeaderField:existingKey];
                
                // if we have a match here, then key and value match
                if([customValue isEqualToString:existingValue])
                {
                    // mark this custom header as being processed
                    customHeaderProcessed = YES;
                    
                    // no point in looking through other existing headers when we've found a match
                    break;
                }
            }
        }
        
        // if this particular custom header hasn't been processed, then mark that not all headers have been processed
        if(customHeaderProcessed == NO)
        {
            allHeadersProcessed = NO;
            break;
        }
    }
    
    // if all headers exist on the request, no modification is necessary
    if(allHeadersProcessed)
        return YES;
    
    // otherwise, we need to cancel the existing request and create a new (mutable) one
    NSMutableURLRequest *mutableRequest = [request mutableCopy];
    
    // for each custom header
    for(NSString *key in [customHeaders allKeys])
    {
        // grab the value needing set
        NSString *value = [customHeaders valueForKey:key];
        
        // set the value to the custom header
        [mutableRequest addValue:value forHTTPHeaderField:key];
        
    }
    
    // load the new mutable request
    [webView loadRequest:mutableRequest];
    
    // cancel the existing request
    return NO;
}

@end


@implementation UINavigationController (Rotation_IOS6)

-(BOOL)shouldAutorotate
{
    
    return UIInterfaceOrientationMaskPortrait;
    
}

-(NSUInteger)supportedInterfaceOrientations
{
    
    return UIInterfaceOrientationMaskPortrait;
    
}

- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation
{
    
    return UIInterfaceOrientationPortrait;
    
}

@end
